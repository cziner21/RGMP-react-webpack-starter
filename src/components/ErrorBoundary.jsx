class ErrorBoundary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.log(`error: ${error}`)
        console.log(`details: ${errorInfo}`)
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children
        }

        return <h2>Error, something went wrong!</h2>
    }
}

export default ErrorBoundary
