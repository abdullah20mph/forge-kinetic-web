import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Guide = {
  industry: string;
  pain_points: string[];
  recommended_automations: Array<{
    name: string;
    what_it_does: string;
    tools: string[];
    integration_points: string[];
    complexity: 'low' | 'medium' | 'high';
    estimated_setup_time_days: number;
  }>;
  delivery_summary: string;
  implementation_phases: Array<{
    phase: string;
    activities: string[];
    duration_days: number;
    deliverables: string[];
  }>;
  timeline_total_days: number;
  estimated_cost_usd_range: { min: number; max: number };
  tools_stack: string[];
  roles_involved: string[];
  metrics_to_track: string[];
  risks_considerations: string[];
};

export const AutomationGuide: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [tasks, setTasks] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [techStack, setTechStack] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guide, setGuide] = useState<Guide | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setGuide(null);
    try {
      const res = await fetch('/api/automation-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, tasks, companySize, techStack }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate guide');
      setGuide(data.guide as Guide);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6 sm:p-8">
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Automation Guide</h3>
      <p className="text-gray-300 mb-6">Describe your industry and manual tasks; get a tailored automation plan.</p>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Industry</label>
          <Input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g., e-commerce, real estate, healthcare"
            className="text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Manual tasks / pain points</label>
          <Textarea
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder="List the repetitive tasks, bottlenecks, and workflows that feel exhausting"
            className="text-black"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Company size (optional)</label>
            <Input
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              placeholder="e.g., 10, 50-100"
              className="text-black"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tech stack (optional)</label>
            <Input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g., Shopify, HubSpot, Slack, Notion"
              className="text-black"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-gray-100">
            {loading ? 'Generating…' : 'Generate Guide'}
          </Button>
          {error && <span className="text-red-400 text-sm self-center">{error}</span>}
        </div>
      </form>

      {guide && (
        <div className="mt-8 grid gap-6">
          <div>
            <h4 className="text-xl font-semibold text-white">Recommended Automations</h4>
            <div className="mt-3 grid gap-3">
              {guide.recommended_automations?.map((a, idx) => (
                <div key={idx} className="border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-semibold">{a.name}</p>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-200 capitalize">{a.complexity}</span>
                  </div>
                  <p className="text-gray-300 mt-1">{a.what_it_does}</p>
                  <p className="text-gray-400 mt-2 text-sm">Tools: {a.tools?.join(', ')}</p>
                  <p className="text-gray-400 mt-1 text-sm">Integrations: {a.integration_points?.join(', ')}</p>
                  <p className="text-gray-500 mt-1 text-sm">ETA: {a.estimated_setup_time_days} days</p>
                </div>
              ))}
            </div>
          </div>

          

          {guide.metrics_to_track?.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-white">Metrics to track</h4>
              <p className="text-gray-300 mt-2">{guide.metrics_to_track.join(', ')}</p>
            </div>
          )}

          {guide.risks_considerations?.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-white">Risks & considerations</h4>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                {guide.risks_considerations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* roles_involved already shown above */}
        </div>
      )}
    </div>
  );
};

export default AutomationGuide;


