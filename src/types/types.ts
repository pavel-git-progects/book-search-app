export interface BookInfoType {
    id: string
    volumeInfo: {
        title: string
        authors: Array<string>
        description: string
        imageLinks: {
            thumbnail?: string
            small?: string
            medium?: string
            large?: string
            extraLarge?: string
        }
        categories: Array<string>
    }
}

export interface BooksArray {
    totalItems?: number
    items?: Array<BookInfoType>
}

export interface DefaultStateType {
    isFetching: boolean
    showItems: number
    inputValue: string
    dataArray: BooksArray
    categories: "all" | "art" | "biography" | "computers" | "history" | "medical" | "poetry"
    sortingBy: "relevance" | "newest"
}

export interface fetchBooksParamsType {
    query: string
    categories: string
    sorting: string
    showItems: number
    loadMore: boolean
}

export interface ErrorStateType {
    error: string
    isShow?: boolean
}