import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className='min-h-screen bg-[#08090f] flex items-center justify-center'>
      <SignUp
        appearance={{
          variables: {
            colorBackground: '#0f1117',
            colorText: '#e2e8f0',
            colorPrimary: '#6366f1',
            colorInputBackground: '#1a1d2e',
            colorInputText: '#e2e8f0',
          },
          elements: {
            card: 'shadow-2xl border border-white/10',
            headerTitle: 'text-slate-100',
            headerSubtitle: 'text-slate-400',
            socialButtonsBlockButton: 'border border-white/10 text-slate-300 hover:bg-white/5',
            formFieldLabel: 'text-slate-300',
            footerActionLink: 'text-indigo-400 hover:text-indigo-300',
          },
        }}
      />
    </div>
  );
}
