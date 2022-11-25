declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_CHAIN_ID: number;
      NEXT_PUBLIC_NODE_1: number;
      NEXT_PUBLIC_NODE_2: number;
      NEXT_PUBLIC_NODE_3: number;
      NEXT_PUBLIC_WEB_VERSION: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
