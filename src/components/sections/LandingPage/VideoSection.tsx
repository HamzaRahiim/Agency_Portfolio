"use client";

import { useState } from "react";

export default function VideoSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-block mb-4">
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                            Why Fast Line?
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                        <span className="block">You Don&apos;t Need Another Agency</span>
                        <span className="block text-primary mt-2">
                            You Need a True Partner
                        </span>
                    </h2>
                    <div className="flex justify-center">
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl text-center leading-relaxed px-4">
                            Watch how we transform businesses from setup to scale. See real
                            results, real strategies, and real partnerships that drive
                            sustainable growth.
                        </p>
                    </div>
                </div>

                {/* Video Container - Full Width */}
                <div className="relative w-full">
                    <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-card border border-border/60 group">
                        {/* Video Player */}
                        <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10">
                            {!isPlaying ? (
                                <>
                                    {/* Video Thumbnail/Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* TODO: Replace with your actual video thumbnail image */}
                                        {/* <Image
                        src="/video-thumbnail.jpg"
                        alt="Video Thumbnail"
                        fill
                        className="object-cover"
                      /> */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Play Button */}
                                        <button
                                            onClick={() => setIsPlaying(true)}
                                            className="relative z-10 group/play flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-2xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50"
                                            aria-label="Play video"
                                        >
                                            <svg
                                                className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground ml-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Video Info Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 z-10">
                                        <div className="max-w-2xl mx-auto text-center">
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                                                Passive Income Alert
                                            </h3>
                                            <p className="text-base sm:text-lg text-white/90">
                                                Discover the secret to making money work for you
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* TODO: Replace with your actual video */}
                                    {/* Example:
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src="/demo-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                                        <div className="text-center text-white p-8">
                                            <p className="text-lg mb-4">Video Player</p>
                                            <p className="text-sm text-white/70 mb-6">
                                                Replace this placeholder with your actual video
                                            </p>
                                            <button
                                                onClick={() => setIsPlaying(false)}
                                                className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Floating Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
                        <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-5 sm:px-6 sm:py-6 text-center hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                                1000+
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                Successful Stores
                            </div>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-5 sm:px-6 sm:py-6 text-center hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                                $50M+
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                Revenue Generated
                            </div>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-5 sm:px-6 sm:py-6 text-center hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                                98%
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                Client Satisfaction
                            </div>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-5 sm:px-6 sm:py-6 text-center hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                                24/7
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                Support Available
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

