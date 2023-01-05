import * as path from 'path';

const FRAMEWORKS = {
    ANGULAR: 'angular',
    NEXTJS: 'nextjs',
    NUXTJS: 'nuxtjs',
    SVELTEKIT: 'sveltekit',
};

const LIBRARIES = {
    ANGULAR: 'angular',
    REACT: 'react',
    SVELTE: 'svelte',
    MARKO: 'marko',
}

// load the package.json file
function getPackageJson() {
    try {
        return require(path.join(process.cwd(), 'package.json'));
    } catch (err) {
        return {};
    }
}

const detectors = {
    frameworks: {
        async [FRAMEWORKS.SVELTEKIT](pkgJson) {
            // check if @sveltejs/kit is a dependency
            return null;
        }
    }
}

async function detectFrameworks() {
    const result = [];
    const pkgJson = getPackageJson();
    for(const framework in detectors.frameworks) {
        const detector = detectors.frameworks[framework];
        const detected = await detector(pkgJson);
        if(detected) {
            result.push({framework, ...detected});
        }
    }
    return result;
}

function detectLibraries() {
    const pkgJson = getPackageJson();
}