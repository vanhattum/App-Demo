// This file runs before any other code on the server
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Replace Node's broken localStorage with a working stub before anything imports supabase
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).localStorage = {
        getItem: (() => null) as any,
        setItem: (() => {}) as any,
        removeItem: (() => {}) as any,
        clear: (() => {}) as any,
        key: (() => null) as any,
        length: 0
      }
    }
  }
}

