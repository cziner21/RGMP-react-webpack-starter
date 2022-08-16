import '../styles/globals.css'
import { store } from '../app.store'
import MainLayout from '../components/mainLayout/mainLayout'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </Provider>
    )
}

export default MyApp
