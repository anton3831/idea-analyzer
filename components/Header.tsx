import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[#08090f]/80 backdrop-blur-sm border-b border-white/5'>
      {/* 로고 */}
      <div className='flex items-center gap-2'>
        <span className='text-sm font-semibold text-slate-200 tracking-tight'>
          아이디어렌즈
        </span>
        <span className='text-xs text-slate-500 hidden sm:inline'>
          — AI 사업 아이디어 분석기
        </span>
      </div>

      {/* 인증 버튼 영역 */}
      <div className='flex items-center gap-3'>
        <Show when='signed-out'>
          <SignInButton mode='redirect'>
            <button className='text-xs text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5'>
              로그인
            </button>
          </SignInButton>
          <SignUpButton mode='redirect'>
            <button className='text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-3 py-1.5 rounded-lg font-medium'>
              회원가입
            </button>
          </SignUpButton>
        </Show>
        <Show when='signed-in'>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
              },
            }}
          />
        </Show>
      </div>
    </header>
  );
}
