/**
 * Export step definitions per platform
 * - global: Overall export progress (shown in left panel)
 * - design: Per-design progress (shown in design cards)
 */
export declare const EXPORT_STEPS_CONFIG: {
    readonly webflow: {
        readonly global: readonly [{
            readonly id: "prepare";
            readonly label: "Preparing";
        }, {
            readonly id: "styles";
            readonly label: "Converting styles";
        }, {
            readonly id: "global_sections";
            readonly label: "Building global sections";
        }, {
            readonly id: "assets";
            readonly label: "Uploading assets";
        }, {
            readonly id: "processing";
            readonly label: "Processing designs";
        }, {
            readonly id: "finalize";
            readonly label: "Finalizing";
        }];
        readonly design: readonly [{
            readonly id: "build_sections";
            readonly label: "Build sections";
        }, {
            readonly id: "page_assembly";
            readonly label: "Page assembly";
        }, {
            readonly id: "generate_xscp";
            readonly label: "Generate export";
        }, {
            readonly id: "validate_structure";
            readonly label: "Validating structure";
        }];
    };
    readonly bricks: {
        readonly global: readonly [{
            readonly id: "prepare";
            readonly label: "Preparing";
        }, {
            readonly id: "global_sections";
            readonly label: "Building global sections";
        }, {
            readonly id: "processing";
            readonly label: "Processing designs";
        }, {
            readonly id: "finalize";
            readonly label: "Finalizing";
        }];
        readonly design: readonly [{
            readonly id: "initialize";
            readonly label: "Initialize";
        }, {
            readonly id: "build";
            readonly label: "Build sections";
        }, {
            readonly id: "assembly";
            readonly label: "Assembly";
        }, {
            readonly id: "generate";
            readonly label: "Generate JSON";
        }];
    };
    readonly elementor: {
        readonly global: readonly [{
            readonly id: "prepare";
            readonly label: "Preparing";
        }, {
            readonly id: "global_sections";
            readonly label: "Building global sections";
        }, {
            readonly id: "processing";
            readonly label: "Processing designs";
        }, {
            readonly id: "finalize";
            readonly label: "Finalizing";
        }];
        readonly design: readonly [{
            readonly id: "initialize";
            readonly label: "Initialize";
        }, {
            readonly id: "build";
            readonly label: "Build sections";
        }, {
            readonly id: "assembly";
            readonly label: "Assembly";
        }, {
            readonly id: "generate";
            readonly label: "Generate JSON";
        }];
    };
};
interface ExportStepsOptions {
    /** Skip global sections step (used when assembled designs are available) */
    skipGlobalSections?: boolean;
}
/**
 * Get export steps config for a platform
 * Falls back to webflow if platform not found
 */
export declare function getExportStepsConfig(platform: string, options?: ExportStepsOptions): {
    readonly global: readonly [{
        readonly id: "prepare";
        readonly label: "Preparing";
    }, {
        readonly id: "styles";
        readonly label: "Converting styles";
    }, {
        readonly id: "global_sections";
        readonly label: "Building global sections";
    }, {
        readonly id: "assets";
        readonly label: "Uploading assets";
    }, {
        readonly id: "processing";
        readonly label: "Processing designs";
    }, {
        readonly id: "finalize";
        readonly label: "Finalizing";
    }];
    readonly design: readonly [{
        readonly id: "build_sections";
        readonly label: "Build sections";
    }, {
        readonly id: "page_assembly";
        readonly label: "Page assembly";
    }, {
        readonly id: "generate_xscp";
        readonly label: "Generate export";
    }, {
        readonly id: "validate_structure";
        readonly label: "Validating structure";
    }];
} | {
    readonly global: readonly [{
        readonly id: "prepare";
        readonly label: "Preparing";
    }, {
        readonly id: "global_sections";
        readonly label: "Building global sections";
    }, {
        readonly id: "processing";
        readonly label: "Processing designs";
    }, {
        readonly id: "finalize";
        readonly label: "Finalizing";
    }];
    readonly design: readonly [{
        readonly id: "initialize";
        readonly label: "Initialize";
    }, {
        readonly id: "build";
        readonly label: "Build sections";
    }, {
        readonly id: "assembly";
        readonly label: "Assembly";
    }, {
        readonly id: "generate";
        readonly label: "Generate JSON";
    }];
} | {
    global: ({
        readonly id: "prepare";
        readonly label: "Preparing";
    } | {
        readonly id: "styles";
        readonly label: "Converting styles";
    } | {
        readonly id: "global_sections";
        readonly label: "Building global sections";
    } | {
        readonly id: "assets";
        readonly label: "Uploading assets";
    } | {
        readonly id: "processing";
        readonly label: "Processing designs";
    } | {
        readonly id: "finalize";
        readonly label: "Finalizing";
    })[];
    design: readonly [{
        readonly id: "build_sections";
        readonly label: "Build sections";
    }, {
        readonly id: "page_assembly";
        readonly label: "Page assembly";
    }, {
        readonly id: "generate_xscp";
        readonly label: "Generate export";
    }, {
        readonly id: "validate_structure";
        readonly label: "Validating structure";
    }] | readonly [{
        readonly id: "initialize";
        readonly label: "Initialize";
    }, {
        readonly id: "build";
        readonly label: "Build sections";
    }, {
        readonly id: "assembly";
        readonly label: "Assembly";
    }, {
        readonly id: "generate";
        readonly label: "Generate JSON";
    }] | {
        id: string;
        label: string;
    }[];
};
export {};
//# sourceMappingURL=export-steps.d.ts.map