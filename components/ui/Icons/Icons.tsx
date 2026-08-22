import React from 'react';
import { BuildIcon } from './BuildIcon';
import { DesignIcon } from './DesignIcon';
import { DiscoveryIcon } from './DiscoveryIcon';
import { LaunchIcon } from './LaunchIcon';
import { SupportIcon } from './SupportIcon';

export type ProcessIconKey = 'discovery' | 'design' | 'build' | 'launch' | 'support';

export const ProcessIcons: Record<ProcessIconKey, React.ComponentType> = {
    discovery: DiscoveryIcon,
    design: DesignIcon,
    build: BuildIcon,
    launch: LaunchIcon,
    support: SupportIcon,
};

export {
    BuildIcon,
    DesignIcon,
    DiscoveryIcon,
    LaunchIcon,
    SupportIcon,
};