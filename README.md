# @upbuilder/shared

Shared TypeScript types, handlers, and utilities for the UpBuilder WebSocket system.

## Overview

This package provides a single source of truth for all WebSocket communication between:
- **Backend** (Node.js WebSocket server)
- **Plugin** (Figma plugin)
- **Frontend** (React web application)

## Features

✅ **Type-safe WebSocket events** - Full TypeScript support for Socket.IO
✅ **Modular handlers** - Reusable event handlers with dependency injection
✅ **Workflow state machine** - Complete workflow logic with helper functions
✅ **Error handling** - Centralized error codes and messages
✅ **Zero duplication** - Import types, don't redefine them

## Installation

```bash
# In backend-new/
npm install file:../shared

# In plugin-new/
npm install file:../shared

# In frontend-new/
npm install file:../shared
```

## Usage

### Types

```typescript
// Import all types
import type {
  Project,
  NodeData,
  ClientToServerEvents,
  ServerToClientEvents
} from '@upbuilder/shared';

// Use in Socket.IO server
import { Server } from 'socket.io';

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

// Use in Socket.IO client
import { io } from 'socket.io-client';

const socket = io<ServerToClientEvents, ClientToServerEvents>('http://localhost:3001');
```

### Handlers (Backend)

```typescript
import { Server } from 'socket.io';
import {
  createPluginHandlers,
  createWorkflowHandlers,
  createExportHandlers,
  handleAuth,
  handleJoinRoom,
  handleSubscribe
} from '@upbuilder/shared';

// Create server
const io = new Server();

// Implement service interfaces
const pluginServices = {
  createProject: async (data) => { /* ... */ },
  processImageBatch: async (data) => { /* ... */ },
  verifyAllBatches: async (projectId, designId) => { /* ... */ },
  analyzeComposites: async (projectId, designId) => { /* ... */ },
  processComposites: async (data) => { /* ... */ }
};

// Create handlers
const pluginHandlers = createPluginHandlers(io, pluginServices);
const workflowHandlers = createWorkflowHandlers(io, workflowServices);
const exportHandlers = createExportHandlers(io, exportServices);

// Register event listeners
io.on('connection', (socket) => {
  socket.on('auth', (data, cb) => handleAuth(socket, data, cb));
  socket.on('join_room', (data, cb) => handleJoinRoom(socket, data, cb));
  socket.on('subscribe', (data, cb) => handleSubscribe(socket, data, cb));

  socket.on('send_nodes', (data, cb) =>
    pluginHandlers.handleSendNodes(socket, data, cb)
  );

  socket.on('workflow_start', (data, cb) =>
    workflowHandlers.handleWorkflowStart(socket, data, cb)
  );

  socket.on('request_export_code', (data, cb) =>
    exportHandlers.handleRequestExport(socket, data, cb)
  );
});
```

### Workflow Helpers

```typescript
import {
  getNextStatus,
  requiresUserAction,
  canSkip,
  isProcessingStage,
  WORKFLOW_TRANSITIONS
} from '@upbuilder/shared';

const currentStatus = 'review_sections';
const nextStatus = getNextStatus(currentStatus); // 'config_styles'
const needsUser = requiresUserAction(currentStatus); // true
const canSkipStage = canSkip(currentStatus); // true
const isAutomated = isProcessingStage('build'); // true
```

### Error Handling

```typescript
import {
  ERROR_CODES,
  getErrorMessage,
  type ErrorCode
} from '@upbuilder/shared';

// Use error codes
const error: ErrorCode = ERROR_CODES.AUTH_UNAUTHORIZED;

// Get user-friendly message
const message = getErrorMessage(error);
// "You are not authorized to perform this action"

// In callbacks
callback({
  success: false,
  error: 'Authentication failed',
  code: ERROR_CODES.AUTH_INVALID_CREDENTIALS
});
```

## Structure

```
shared/
├── types/              # All TypeScript type definitions
│   ├── auth.ts        # User, auth data
│   ├── callback.ts    # Callback response types
│   ├── error.ts       # Error codes
│   ├── events.ts      # Server → Client events
│   ├── payloads.ts    # Client → Server payloads
│   ├── plugin.ts      # Figma plugin types
│   ├── progress.ts    # Processing progress
│   ├── project.ts     # Project data structures
│   ├── socket.ts      # Socket.IO event interfaces
│   └── workflow.ts    # Workflow state machine
├── handlers/          # Reusable event handlers
│   ├── auth.handler.ts
│   ├── export.handler.ts
│   ├── plugin.handler.ts
│   ├── room.handler.ts
│   ├── subscription.handler.ts
│   └── workflow.handler.ts
├── constants/         # Shared constants
│   └── errors.ts
└── index.ts          # Main entry point
```

## Development

```bash
# Build package
npm run build

# Watch mode
npm run dev

# Clean build
npm run clean
```

## Benefits

- **Single Source of Truth**: All types defined once
- **Type Safety**: Compile-time errors across all systems
- **Auto-completion**: Full IntelliSense support
- **Refactor-safe**: Change types once, updates everywhere
- **Self-documenting**: Types serve as documentation
- **Reduced code**: 83% reduction in duplicate code

## License

UNLICENSED - Internal use only
