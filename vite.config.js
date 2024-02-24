import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig((config) => {
    console.log(config);
    return {
        plugins: [react()],
        server: {
            port: 5000
        }
    }
})
