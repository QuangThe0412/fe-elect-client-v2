const PublicLayout = ({ children }: any) => {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <h1>PublicLayout</h1>
            {children}
        </div>
    )
}

export default PublicLayout