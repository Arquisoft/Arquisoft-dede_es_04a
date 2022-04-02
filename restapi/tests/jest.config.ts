export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["**/routes/user.ts"],
    setupFiles: ['<rootDir>/vars.ts']
}