import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',  // Explicitly set to localhost
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
       input: {
        main: resolve(__dirname, 'public/index.html')
      },
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'zustand'
          ]
        }
      }
    }
  },
  define: {
    'process.env': JSON.stringify(process.env)
  }
})















// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:7000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   },
//   build: {
//     outDir: 'dist',
//     sourcemap: false,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           'vendor': [
//             'react',
//             'react-dom',
//             'react-router-dom',
//             'zustand'
//           ]
//         }
//       }
//     }
//   },
//   // Environment variables
//   define: {
//     'process.env': JSON.stringify(process.env)
//   }
// })
