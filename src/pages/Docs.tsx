import React from "react";

const Docs = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-5xl mx-auto mt-14"> {/* Added mt-4 for top margin */}
                <h1 className="text-4xl font-bold text-amber-500 mb-6">CodeBridge Documentation</h1>
                <p className="text-gray-400 text-lg mb-8">
                    Welcome to the official documentation for CodeBridge. Here, you will find all the necessary information on how to use the platform effectively.
                </p>

                {/* Getting Started */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-amber-500 mb-4">Getting Started</h2>
                    <p className="text-gray-300 mb-4">
                        CodeBridge provides an interactive way to learn programming through Scratch Mode and Comparison Mode.
                        You can also explore the AI Assistant, Code Converter, and the Playground for hands-on practice.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>Sign up and choose your preferred learning mode.</li>
                        <li>Use the interactive code editor to write and run code.</li>
                        <li>Compare programming languages side by side.</li>
                        <li>Convert code between different programming languages.</li>
                        <li>Get AI-powered coding assistance when needed.</li>
                    </ul>
                </section>

                {/* Learning Modes */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-amber-500 mb-4">Learning Modes</h2>
                    <div className="bg-black/50 p-6 rounded-lg border border-amber-500/20 shadow-lg">
                        <h3 className="text-xl font-semibold text-amber-400 mb-2">Scratch Mode</h3>
                        <p className="text-gray-300">
                            Learn programming from scratch with interactive lessons and coding exercises. Ideal for beginners who want a structured approach.
                        </p>
                    </div>
                    <div className="bg-black/50 p-6 mt-4 rounded-lg border border-amber-500/20 shadow-lg">
                        <h3 className="text-xl font-semibold text-amber-400 mb-2">Comparison Mode</h3>
                        <p className="text-gray-300">
                            Compare two programming languages side by side. If you're transitioning to a new language, this mode makes it easier to understand the differences and similarities.
                        </p>
                    </div>
                </section>

                {/* Features */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-amber-500 mb-4">Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-black/50 rounded-lg border border-amber-500/20">
                            <h3 className="text-lg font-semibold text-amber-400">Interactive Code Editor</h3>
                            <p className="text-gray-300">Write, test, and debug your code in a live environment with AI assistance.</p>
                        </div>
                        <div className="p-4 bg-black/50 rounded-lg border border-amber-500/20">
                            <h3 className="text-lg font-semibold text-amber-400">Code Converter</h3>
                            <p className="text-gray-300">Easily translate code between different programming languages.</p>
                        </div>
                        <div className="p-4 bg-black/50 rounded-lg border border-amber-500/20">
                            <h3 className="text-lg font-semibold text-amber-400">AI Coding Assistant</h3>
                            <p className="text-gray-300">Ask the AI to debug, explain, or improve your code instantly.</p>
                        </div>
                        <div className="p-4 bg-black/50 rounded-lg border border-amber-500/20">
                            <h3 className="text-lg font-semibold text-amber-400">Project-Based Learning</h3>
                            <p className="text-gray-300">Build real-world projects following step-by-step instructions and deploy them to GitHub.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Support */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-amber-500 mb-4">Need Help?</h2>
                    <p className="text-gray-300">
                        If you encounter any issues or have questions, feel free to reach out to our support team.
                    </p>
                    <p className="text-amber-400 mt-2">
                        Email: <a href="mailto:support@codebridge.com" className="hover:text-amber-300">support@codebridge.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Docs;
