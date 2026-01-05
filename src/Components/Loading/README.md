# Loading Components Documentation

This directory contains comprehensive loading components for the Home Hero application, providing consistent and user-friendly loading states throughout the app.

## Components Overview

### 1. LoadingSpinner
A flexible spinner component for various loading scenarios.

```jsx
import { LoadingSpinner } from '../Components/Loading';

<LoadingSpinner 
    size="lg" 
    color="primary" 
    text="Loading..." 
    fullScreen={true} 
/>
```

**Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
- `text`: Optional loading text
- `fullScreen`: Boolean for full-screen overlay
- `className`: Additional CSS classes

### 2. LoadingButton
Enhanced button with built-in loading states.

```jsx
import { LoadingButton } from '../Components/Loading';

<LoadingButton
    loading={isSubmitting}
    loadingText="Saving..."
    variant="primary"
    size="md"
    onClick={handleSubmit}
>
    Save Changes
</LoadingButton>
```

**Props:**
- `loading`: Boolean loading state
- `loadingText`: Text to show when loading
- `variant`: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'error' | 'success' | 'warning' | 'info'
- `size`: 'xs' | 'sm' | 'md' | 'lg'
- `disabled`: Additional disabled state
- All standard button props

### 3. LoadingCard & LoadingCardGrid
Skeleton loading for service cards and grids.

```jsx
import { LoadingCard, LoadingCardGrid } from '../Components/Loading';

// Single card
<LoadingCard showImage={true} showButton={true} lines={2} />

// Grid of cards
<LoadingCardGrid count={8} />
```

**LoadingCard Props:**
- `showImage`: Boolean to show image skeleton
- `showTitle`: Boolean to show title skeleton
- `showDescription`: Boolean to show description skeleton
- `showButton`: Boolean to show button skeleton
- `lines`: Number of description lines
- `className`: Additional CSS classes

### 4. LoadingTable
Skeleton loading for tables.

```jsx
import { LoadingTable } from '../Components/Loading';

<LoadingTable 
    columns={5}
    rows={5}
    headers={['Service', 'Price', 'Date', 'Status', 'Actions']}
/>
```

**Props:**
- `columns`: Number of columns
- `rows`: Number of skeleton rows
- `headers`: Array of header strings
- `className`: Additional CSS classes

### 5. LoadingStates
Various specialized loading and state components.

```jsx
import { 
    PageLoading, 
    SectionLoading, 
    InlineLoading, 
    ContentLoading,
    ErrorState,
    EmptyState 
} from '../Components/Loading';

// Full page loading
<PageLoading message="Loading application..." />

// Section loading
<SectionLoading message="Loading services..." height="h-64" />

// Inline loading
<InlineLoading message="Saving..." size="sm" />

// Content loading (skeleton)
<ContentLoading lines={3} showAvatar={true} />

// Error state with retry
<ErrorState 
    message="Failed to load data" 
    onRetry={refetchData} 
/>

// Empty state
<EmptyState
    title="No items found"
    description="Try adjusting your filters"
    action={<button>Clear Filters</button>}
    icon={<SearchIcon />}
/>
```

## Usage Patterns

### 1. API Data Fetching
```jsx
const { data, isLoading, error, refetch } = useQuery(['services'], fetchServices);

if (isLoading) return <LoadingCardGrid count={8} />;
if (error) return <ErrorState message="Failed to load" onRetry={refetch} />;
if (!data?.length) return <EmptyState title="No services found" />;

return <ServiceGrid services={data} />;
```

### 2. Form Submissions
```jsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
        await submitForm(data);
        toast.success('Saved successfully!');
    } catch (error) {
        toast.error('Failed to save');
    } finally {
        setIsSubmitting(false);
    }
};

return (
    <form onSubmit={handleSubmit}>
        {/* form fields */}
        <LoadingButton
            type="submit"
            loading={isSubmitting}
            loadingText="Saving..."
        >
            Save Changes
        </LoadingButton>
    </form>
);
```

### 3. Page-Level Loading
```jsx
const MyPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData()
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <PageLoading message="Loading page..." />;
    if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

    return <PageContent data={data} />;
};
```

## Best Practices

### 1. Consistent Loading States
- Use the same loading components throughout the app
- Match loading skeleton structure to actual content
- Provide meaningful loading messages

### 2. Error Handling
- Always provide retry functionality for failed requests
- Show user-friendly error messages
- Include fallback states for network issues

### 3. Performance
- Use skeleton loading for better perceived performance
- Implement proper loading states for all async operations
- Avoid blocking the entire UI for partial updates

### 4. Accessibility
- Loading components include proper ARIA attributes
- Screen readers can announce loading states
- Focus management during loading transitions

## Migration Guide

### From Old Loading Patterns
```jsx
// Old pattern
{isLoading ? (
    <div className="flex justify-center">
        <span className="loading loading-spinner"></span>
    </div>
) : (
    <Content />
)}

// New pattern
{isLoading ? (
    <SectionLoading message="Loading content..." />
) : (
    <Content />
)}
```

### Button Loading States
```jsx
// Old pattern
<button disabled={isLoading}>
    {isLoading ? 'Loading...' : 'Submit'}
</button>

// New pattern
<LoadingButton loading={isLoading} loadingText="Submitting...">
    Submit
</LoadingButton>
```

## Customization

All loading components support:
- Custom CSS classes via `className` prop
- Theme-aware colors that adapt to light/dark mode
- Responsive design for mobile and desktop
- Consistent styling with DaisyUI theme

## Testing

Loading components are designed to be easily testable:
- Use `data-testid` attributes for component identification
- Mock loading states in tests
- Verify loading text and accessibility features