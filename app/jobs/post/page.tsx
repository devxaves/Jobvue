'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Briefcase, Clock, Zap, BookOpen, Heart, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import PostJobIllustration from '@/components/illustrations/PostJobIllustration';

const categories = [
  'Tech & Development', 'UI/UX Design', 'Content & Writing', 'Digital Marketing',
  'Photography & Video', 'Tutoring & Teaching', 'Delivery & Logistics',
  'Event & Hospitality', 'Manual & Labour', 'Other',
];

const jobTypes = [
  { value: 'freelance', label: 'Freelance', icon: '🔧', desc: 'Project-based work' },
  { value: 'parttime', label: 'Part-time', icon: '⏰', desc: 'Regular hours, flexible' },
  { value: 'gig', label: 'Quick Gig', icon: '⚡', desc: 'One-time tasks' },
  { value: 'internship', label: 'Internship', icon: '📚', desc: 'Learning opportunity' },
  { value: 'volunteer', label: 'Volunteer', icon: '🤝', desc: 'Give back' },
];

const workModes = [
  { value: 'remote', label: 'Remote', icon: '🏠' },
  { value: 'inperson', label: 'In-Person', icon: '🏢' },
  { value: 'hybrid', label: 'Hybrid', icon: '🔀' },
];

const payTypes = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'hourly', label: 'Hourly Rate' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'negotiable', label: 'Negotiable' },
];

export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '', jobType: '', category: '', positions: '1', isUrgent: false,
    description: '', requirements: [''], skills: [''], workingHours: '',
    workMode: 'remote', address: '', city: '', pincode: '',
    payType: 'negotiable', payMin: '', payMax: '', deadline: '', applicantLimit: '',
  });

  const updateForm = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const updateListItem = (field: 'requirements' | 'skills', index: number, value: string) => {
    setForm(prev => {
      const list = [...prev[field]];
      list[index] = value;
      return { ...prev, [field]: list };
    });
  };

  const addListItem = (field: 'requirements' | 'skills') => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeListItem = (field: 'requirements' | 'skills', index: number) => {
    setForm(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const canProceed = () => {
    if (step === 1) return form.title.length >= 5 && form.jobType && form.category;
    if (step === 2) return form.description.length >= 50;
    if (step === 3) return true;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          requirements: form.requirements.filter(r => r.trim()),
          skills: form.skills.filter(s => s.trim()),
          payMin: form.payMin ? parseInt(form.payMin) : null,
          payMax: form.payMax ? parseInt(form.payMax) : null,
          positions: parseInt(form.positions) || 1,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Job posted successfully!');
        router.push(`/jobs/${data.id}`);
      } else {
        toast.error(data.error || 'Failed to post job');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Link href="/jobs" className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-blue-bright mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </Link>

      <div className="text-center mb-8">
        <PostJobIllustration className="w-32 h-32 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-brand-text" style={{ fontFamily: 'var(--font-sora)' }}>Post a Job</h1>
        <p className="text-brand-text-secondary mt-2">Find the right talent for your project</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              s === step ? 'bg-brand-blue-bright text-white scale-110 shadow-lg' :
              s < step ? 'bg-brand-green text-white' :
              'bg-gray-200 text-gray-500'
            }`} style={{ boxShadow: s === step ? '0 0 0 4px rgba(37,99,235,0.2)' : 'none' }}>
              {s < step ? '✓' : s}
            </div>
            {s < 4 && <div className={`w-8 md:w-16 h-0.5 ${s < step ? 'bg-brand-green' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="clay-card-soft"
      >
        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brand-text" style={{ fontFamily: 'var(--font-sora)' }}>Job Basics</h2>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Job Title *</label>
              <input type="text" value={form.title} onChange={e => updateForm('title', e.target.value)} placeholder="e.g., Logo Designer for Startup" className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright focus:ring-2 focus:ring-brand-blue-bright/20 outline-none" />
              <p className="text-xs text-brand-text-secondary mt-1">{form.title.length}/100 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-3">Job Type *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {jobTypes.map(t => (
                  <button key={t.value} onClick={() => updateForm('jobType', t.value)} className={`p-4 rounded-2xl border-2 text-left transition-all ${form.jobType === t.value ? 'border-brand-blue-bright bg-blue-50' : 'border-brand-border hover:border-brand-blue-bright/50'}`}>
                    <span className="text-xl">{t.icon}</span>
                    <p className="font-semibold text-brand-text text-sm mt-1">{t.label}</p>
                    <p className="text-xs text-brand-text-secondary">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Category *</label>
              <select value={form.category} onChange={e => updateForm('category', e.target.value)} className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none appearance-none">
                <option value="">Select category...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-brand-text">Urgent?</label>
              <button onClick={() => updateForm('isUrgent', !form.isUrgent)} className={`w-12 h-6 rounded-full transition-all ${form.isUrgent ? 'bg-red-500' : 'bg-gray-300'} relative`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${form.isUrgent ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Description */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brand-text" style={{ fontFamily: 'var(--font-sora)' }}>Job Description</h2>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Full Description *</label>
              <textarea value={form.description} onChange={e => updateForm('description', e.target.value)} placeholder="Describe the work, what you need done, and any context..." rows={6} className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright focus:ring-2 focus:ring-brand-blue-bright/20 outline-none resize-none" />
              <p className="text-xs text-brand-text-secondary mt-1">{form.description.length} characters (min 50)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Requirements</label>
              {form.requirements.map((req, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={req} onChange={e => updateListItem('requirements', i, e.target.value)} placeholder={`Requirement ${i + 1}`} className="flex-1 px-4 py-2 bg-brand-bg rounded-xl border border-brand-border focus:border-brand-blue-bright outline-none text-sm" />
                  {form.requirements.length > 1 && <button onClick={() => removeListItem('requirements', i)} className="text-red-400 hover:text-red-600 px-2">×</button>}
                </div>
              ))}
              <button onClick={() => addListItem('requirements')} className="text-brand-blue-bright text-sm font-medium hover:underline">+ Add requirement</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Skills Required</label>
              {form.skills.map((skill, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={skill} onChange={e => updateListItem('skills', i, e.target.value)} placeholder={`Skill ${i + 1}`} className="flex-1 px-4 py-2 bg-brand-bg rounded-xl border border-brand-border focus:border-brand-blue-bright outline-none text-sm" />
                  {form.skills.length > 1 && <button onClick={() => removeListItem('skills', i)} className="text-red-400 hover:text-red-600 px-2">×</button>}
                </div>
              ))}
              <button onClick={() => addListItem('skills')} className="text-brand-blue-bright text-sm font-medium hover:underline">+ Add skill</button>
            </div>
          </div>
        )}

        {/* Step 3: Location & Pay */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brand-text" style={{ fontFamily: 'var(--font-sora)' }}>Location & Pay</h2>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-3">Work Mode</label>
              <div className="flex gap-3">
                {workModes.map(m => (
                  <button key={m.value} onClick={() => updateForm('workMode', m.value)} className={`flex-1 p-4 rounded-2xl border-2 text-center transition-all ${form.workMode === m.value ? 'border-brand-blue-bright bg-blue-50' : 'border-brand-border hover:border-brand-blue-bright/50'}`}>
                    <span className="text-xl block">{m.icon}</span>
                    <span className="text-sm font-medium text-brand-text">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {form.workMode !== 'remote' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">City</label>
                  <input value={form.city} onChange={e => updateForm('city', e.target.value)} placeholder="e.g., Kolkata" className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">Address</label>
                  <input value={form.address} onChange={e => updateForm('address', e.target.value)} placeholder="Area / landmark" className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-3">Pay Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {payTypes.map(p => (
                  <button key={p.value} onClick={() => updateForm('payType', p.value)} className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${form.payType === p.value ? 'border-brand-blue-bright bg-blue-50 text-brand-blue-bright' : 'border-brand-border text-brand-text-secondary hover:border-brand-blue-bright/50'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            {form.payType !== 'negotiable' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">Min ₹</label>
                  <input type="number" value={form.payMin} onChange={e => updateForm('payMin', e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">Max ₹</label>
                  <input type="number" value={form.payMax} onChange={e => updateForm('payMax', e.target.value)} placeholder="50000" className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Application Deadline</label>
              <input type="date" value={form.deadline} onChange={e => updateForm('deadline', e.target.value)} className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none" />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brand-text" style={{ fontFamily: 'var(--font-sora)' }}>Review & Post</h2>
            <div className="bg-brand-bg rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-brand-text">{form.title}</h3>
                <button onClick={() => setStep(1)} className="text-brand-blue-bright text-sm hover:underline">Edit</button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="badge-pill bg-purple-100 text-purple-700">{form.jobType}</span>
                <span className="badge-pill bg-gray-100 text-gray-600">{form.category}</span>
                <span className="badge-pill bg-blue-50 text-brand-blue-bright">{form.workMode}</span>
                {form.isUrgent && <span className="badge-urgent">🔥 URGENT</span>}
              </div>
              <p className="text-sm text-brand-text-secondary">{form.description.slice(0, 200)}...</p>
              {form.skills.filter(s => s).length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {form.skills.filter(s => s).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white rounded-lg text-xs text-brand-text-secondary border border-brand-border">{s}</span>
                  ))}
                </div>
              )}
              <p className="font-bold text-brand-green">
                {form.payType === 'negotiable' ? 'Negotiable' : `₹${form.payMin || '0'} – ₹${form.payMax || '0'}`}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-brand-border">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn-jobvue-secondary text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}
          {step < 4 ? (
            <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()} className={`btn-jobvue-primary text-sm ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="btn-jobvue-primary text-sm">
              {submitting ? 'Posting...' : 'Post Job Now 🚀'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
