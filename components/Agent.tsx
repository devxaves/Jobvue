"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("VAPI call ended naturally");
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      console.log("VAPI message received:", message);

      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }

      // Handle other message types that might indicate workflow completion
      if (message.type === "function-call" || message.type === "tool-calls") {
        console.log("Function/tool call detected:", message);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: any) => {
      console.error("VAPI Error:", error);
      setCallStatus(CallStatus.FINISHED);

      // Show a more user-friendly error message
      const errorMessage =
        error?.message || error?.errorMsg || JSON.stringify(error);
      if (errorMessage && typeof errorMessage === "string") {
        if (
          errorMessage.includes("workflow") ||
          errorMessage.includes("assistant")
        ) {
          console.error(
            "VAPI Configuration Error - Check your environment variables"
          );
        }
        if (
          errorMessage.includes("Meeting has ended") ||
          errorMessage.includes("ejection")
        ) {
          console.error(
            "VAPI Meeting Error - This could be due to workflow configuration or timeout"
          );
        }
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  // Update last message
  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  // Handle interview completion and feedback generation
  useEffect(() => {
    // Only proceed if call has finished
    if (callStatus !== CallStatus.FINISHED) return;

    const handleCallCompletion = async () => {
      try {
        if (type === "generate") {
          // Interview generation mode - redirect to home
          console.log("Interview generation completed, redirecting to home...");
          if (messages.length > 0) {
            router.push("/");
          }
        } else {
          // Interview mode - generate feedback and redirect
          console.log("Interview completed. Generating feedback...");

          if (messages.length === 0) {
            console.warn(
              "No messages recorded. Redirecting to interview home..."
            );
            router.push("/interview");
            return;
          }

          const { success, feedbackId: newFeedbackId } = await createFeedback({
            interviewId: interviewId!,
            userId: userId!,
            transcript: messages,
            feedbackId,
          });

          if (success && newFeedbackId) {
            console.log(
              "Feedback generated successfully. Redirecting to feedback page..."
            );
            router.push(`/interview/${interviewId}/feedback`);
          } else {
            console.error("Failed to generate feedback");
            // Fallback to interview details page
            router.push(`/interview/${interviewId}`);
          }
        }
      } catch (error) {
        console.error("Error during call completion:", error);
        // Fallback redirect on error
        router.push(`/interview/${interviewId}`);
      }
    };

    handleCallCompletion();
  }, [callStatus, type, messages, interviewId, userId, feedbackId, router]);

  const handleCall = async () => {
    try {
      setCallStatus(CallStatus.CONNECTING);

      if (type === "generate") {
        // Validate environment variables
        if (!process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID) {
          throw new Error("VAPI_WORKFLOW_ID not configured");
        }

        console.log("Starting VAPI workflow for interview generation");
        console.log("Workflow ID:", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);
        console.log("Variables:", { username: userName, userid: userId });

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            username: userName,
            userid: userId,
          },
        });
      } else {
        let formattedQuestions = "";
        if (questions && questions.length > 0) {
          formattedQuestions = questions
            .map((question) => `- ${question}`)
            .join("\n");
        } else {
          throw new Error("No questions available for interview");
        }

        console.log("Starting VAPI assistant for interview");
        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
        });
      }
    } catch (error) {
      console.error("Error starting VAPI call:", error);
      setCallStatus(CallStatus.FINISHED);

      // Show user-friendly error message
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to start interview: ${errorMessage}`);
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3 className="text-white">AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3 className="text-white">{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
