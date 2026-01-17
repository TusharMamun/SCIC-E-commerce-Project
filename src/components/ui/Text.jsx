const { cn } = require("@/lib/utils")

const Title = ({ children, className }) => {
    return (
        <h1 className={cn(
            "text-2xl md:text-3xl font-bold text-shop-dark-green capitalize tracking-wide font-sans",
            className
        )}>
            {children}
        </h1>
    )
}
const SubTitle = ({ children, className }) => {
    return (
        <h2 className={cn(
            "font-semibold font-sans text-gray-900",
            className
        )}>
            {children}
        </h2>
    )
}

const Subtext = ({ children, className }) => {
    return (
        <p className={cn(
            "text-gray-600 text-sm mt-1 group-hover:text-gray-900",
            className
        )}>
            {children}
        </p>
    )
}

export { Title, Subtext,SubTitle }