# Testing Guide

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react) for testing.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test
```
(Press `a` to run all tests, `f` to run only failed tests, etc.)

### Run tests once (CI mode)
```bash
npm run test:run
```

### Run tests with UI
```bash
npm run test:ui
```
This opens an interactive UI in your browser for running and debugging tests.

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Structure

Tests are located alongside the source files in `__tests__` directories:

```
src/
  components/
    __tests__/
      GraphCanvas.test.tsx
  hooks/
    __tests__/
      useGraph.test.tsx
  context/
    __tests__/
      GraphContext.test.tsx
```

## Writing Tests

### Component Tests

Test React components using React Testing Library:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GraphCanvas } from '../GraphCanvas';

describe('GraphCanvas', () => {
  it('should render canvas element', () => {
    const { container } = render(<GraphCanvas width={800} height={600} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
```

### Hook Tests

Test React hooks using `renderHook`:

```tsx
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGraph } from '../useGraph';
import { GraphProvider } from '../../context/GraphContext';

describe('useGraph', () => {
  it('should return graph instance', () => {
    const wrapper = ({ children }) => (
      <GraphProvider graph={mockGraph} canvas={mockCanvas} selectedNode={null} isReady={true}>
        {children}
      </GraphProvider>
    );

    const { result } = renderHook(() => useGraph(), { wrapper });
    expect(result.current.graph).toBeDefined();
  });
});
```

### Context Tests

Test React Context providers:

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GraphProvider, useGraphContext } from '../GraphContext';

describe('GraphContext', () => {
  it('should provide graph context values', () => {
    let contextValue = null;
    const TestComponent = () => {
      contextValue = useGraphContext();
      return <div>Test</div>;
    };

    render(
      <GraphProvider graph={mockGraph} canvas={mockCanvas} selectedNode={null} isReady={true}>
        <TestComponent />
      </GraphProvider>
    );

    expect(contextValue).toBeDefined();
  });
});
```

## Mocking

The project uses Vitest's mocking capabilities. LiteGraph.js is mocked in tests to avoid requiring the full library:

```tsx
vi.mock('litegraph.js', () => {
  // Mock implementation
});
```

## Test Configuration

Test configuration is in `vitest.config.ts`. Key settings:

- **Environment**: `happy-dom` (faster than jsdom)
- **Setup**: `src/test/setup.ts` (includes test utilities and mocks)
- **CSS**: Disabled in tests (CSS imports are mocked)

## Best Practices

1. **Test behavior, not implementation** - Focus on what the component does, not how it does it
2. **Use accessible queries** - Prefer `getByRole`, `getByLabelText`, etc.
3. **Keep tests simple** - One assertion per test when possible
4. **Mock external dependencies** - Mock LiteGraph.js and other external libraries
5. **Test edge cases** - Include tests for error states, null values, etc.

## Debugging Tests

### Using the UI
```bash
npm run test:ui
```
The UI provides:
- Visual test results
- Ability to run individual tests
- Debug output and error messages
- Coverage visualization

### Using VS Code
Install the Vitest extension for VS Code to run tests directly from the editor.

### Console Logging
You can use `console.log` in tests, but prefer using `screen.debug()` to see the rendered output:

```tsx
import { screen } from '@testing-library/react';

// Debug the rendered component
screen.debug();
```

## Coverage

Coverage reports are generated in the `coverage/` directory when running `npm run test:coverage`.

Coverage includes:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

Aim for >80% coverage on critical paths.
