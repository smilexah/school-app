import React, {createContext, useState, ReactNode} from 'react'

type FilterContextType = {
    query: string
    setQuery: (q: string) => void
    categories: string[]
    toggleCategory: (cat: string) => void
    clearCategories: () => void
}

export const FilterContext = createContext<FilterContextType>({
    query: '',
    setQuery: () => {
    },
    categories: [],
    toggleCategory: () => {
    },
    clearCategories: () => {
    },
})

export const FilterProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [query, setQuery] = useState('')
    const [categories, setCategories] = useState<string[]>([])

    const toggleCategory = (cat: string) => {
        setCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }

    const clearCategories = () => setCategories([])

    return (
        <FilterContext.Provider
            value={{query, setQuery, categories, toggleCategory, clearCategories}}
        >
            {children}
        </FilterContext.Provider>
    )
}
