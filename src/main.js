import App from './routes/+page.svelte';

const app = new App({
    target: document.body,
    props: {
        name: 'halnik'
    }
})

export default app;