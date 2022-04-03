export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["**/controllers/user.ts", "**/controllers/product.ts"],
    setupFiles: ['<rootDir>/vars.ts']
}