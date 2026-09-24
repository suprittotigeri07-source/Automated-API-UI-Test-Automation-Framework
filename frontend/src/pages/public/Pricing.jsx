import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function Pricing() {
  const tiers = [
    {
      name: 'Developer',
      price: '$0',
      period: 'Forever free',
      description: 'Ideal for individual developers evaluating websites and testing staging URLs.',
      features: [
        '100 automated test runs / month',
        'Headless Chromium runner',
        'API & UI validation checks',
        'Failure screenshot capture',
        '24-hour result history',
        'Community Discord support',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$49',
      period: 'per month',
      description: 'Built for QA engineers and growing software teams delivering continuous releases.',
      features: [
        '2,500 automated test runs / month',
        'Multi-browser (Chromium, Firefox, WebKit)',
        'Full Core Web Vitals profiling',
        'AI root-cause failure diagnostics',
        '90-day test retention & reports',
        'Webhook CI/CD integrations',
        'Priority email support',
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'For organizations needing high concurrency, SOC2 compliance, and dedicated runners.',
      features: [
        'Unlimited test runs & parallel workers',
        'Private VPC & on-prem tunnel agents',
        'Custom PyTest test fixture suites',
        'Dedicated SLA & uptime guarantee',
        'SSO (SAML, Okta, Google Workspace)',
        'Dedicated QA solutions architect',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#7091E6] uppercase">Predictable Pricing</span>
          <h1 className="text-4xl font-extrabold text-[#172033] tracking-tight sm:text-5xl mt-2">
            Simple, Transparent Plans
          </h1>
          <p className="mt-4 text-base text-[#5F6B85]">
            Scale your test automation without surprise overages. Change or cancel plans anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                tier.popular
                  ? 'border-2 border-[#3D52A0] shadow-xl bg-white relative'
                  : 'border border-[#ADBBDA]/40 bg-[#F8F9FC] shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3D52A0] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#172033]">{tier.name}</h3>
                </div>
                <p className="text-xs text-[#5F6B85] mt-2 mb-6 min-h-[36px]">{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#ADBBDA]/30">
                  <span className="text-4xl font-extrabold text-[#172033]">{tier.price}</span>
                  <span className="text-xs text-[#5F6B85]">/{tier.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#3D52A0]">What&apos;s included:</div>
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#172033]">
                      <CheckCircle2 className="w-4 h-4 text-[#22A06B] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/register" className="w-full">
                <Button
                  variant={tier.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
