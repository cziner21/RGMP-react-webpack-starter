import Container from '../components/container/container'
import { ResultsFilter } from '../components/filter/filter'
import { SearchResults } from '../components/results/results'

export default function Search() {
    return (
        <Container>
            <ResultsFilter />
            <SearchResults />
        </Container>
    )
}
