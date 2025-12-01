
async function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function AboutSection() {
    // Fake slow server work (3 seconds)
    await wait(3000);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">AboutSection</h1>
        </div>
    );
}