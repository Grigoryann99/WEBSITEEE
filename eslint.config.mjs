import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default [
    ...nextVitals,
    ...nextTypescript,
    { ignores: ['.next/**', '.next-production/**', 'node_modules/**', 'WEBSITE/**', 'public/vendor/**', 'next-env.d.ts'] },
    { rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        // React Compiler is not enabled. Keep the classic Hooks/dependency checks;
        // these compiler-specific diagnostics flag our external-store and imperative-map adapters.
        'react-hooks/set-state-in-effect': 'off',
        'react-hooks/refs': 'off',
        'react-hooks/purity': 'off',
    } },
];
