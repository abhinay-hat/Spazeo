import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(180deg, #0A0908 0%, #12100E 50%, #0A0908 100%)',
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center">
            <span
              className="text-2xl font-black tracking-[-0.5px]"
              style={{ fontFamily: 'var(--font-jakarta)', color: '#F5F3EF' }}
            >
              SPAZEO
            </span>
            <span
              className="inline-block w-1.5 h-1.5 rounded-full ml-0.5 mb-1"
              style={{ backgroundColor: '#D4A017' }}
            />
          </a>
          <p className="text-sm mt-2" style={{ color: '#6B6560' }}>
            Create your free account
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-none',
            },
          }}
        />
      </div>
    </div>
  )
}
