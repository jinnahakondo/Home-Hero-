# Category Navigation Feature

This document describes the category-based navigation system implemented in the Home Hero application.

## Overview

Users can now click on any category card on the home page and be automatically redirected to the services page with that specific category pre-filtered.

## Features Implemented

### 1. Category Cards Navigation
- **Location**: Home page categories section
- **Functionality**: Clicking any category card navigates to `/services?category=CategoryName`
- **Visual Feedback**: Hover effects and smooth transitions

### 2. URL Parameter Handling
- **URL Format**: `/services?category=CategoryName`
- **Auto-filtering**: Services page automatically filters by category from URL
- **Shareable Links**: Users can share category-specific service pages

### 3. Enhanced Services Page
- **Dynamic Header**: Shows category-specific title when filtered
- **Filter Indicator**: Visual badge showing active category filter
- **Quick Clear**: Easy way to remove category filter
- **Breadcrumb Navigation**: Shows navigation path

### 4. Quick Category Filters
- **Location**: Services page (when no category is selected)
- **Functionality**: Quick buttons to filter by category
- **Responsive Design**: Works on all screen sizes

## Technical Implementation

### Components Modified

1. **CategoriesSection.jsx**
   - Added category mapping to backend categories
   - Implemented click handlers with navigation
   - Added analytics tracking

2. **Services.jsx**
   - Added URL parameter handling with `useSearchParams`
   - Enhanced filtering logic
   - Added visual indicators for active filters
   - Implemented breadcrumb navigation

3. **New Components Created**
   - `Breadcrumb.jsx` - Navigation breadcrumb component
   - `useCategoryNavigation.jsx` - Custom hook for category navigation
   - `analytics.js` - Analytics utility functions

### Category Mapping

The home page categories are mapped to backend categories as follows:

| Home Page Category | Backend Category | Description |
|-------------------|------------------|-------------|
| Home Repair | Carpentry | Fix and maintain your home |
| Electrical | Electrical | Professional electrical work |
| Plumbing | Plumbing | Water and pipe solutions |
| Painting | Painting | Interior and exterior painting |
| Landscaping | Gardening | Garden and lawn care |
| Automotive | HVAC | Car maintenance and repair |
| Tech Support | Electrical | Computer and device help |
| Cleaning | Cleaning | Home and office cleaning |

## User Experience Flow

1. **Home Page**: User sees category cards with icons and descriptions
2. **Click Category**: User clicks on a category (e.g., "Plumbing")
3. **Navigation**: Automatically redirected to `/services?category=Plumbing`
4. **Filtered View**: Services page shows only plumbing services
5. **Visual Feedback**: Header shows "Plumbing Services", filter badge visible
6. **Easy Clear**: User can clear filter to see all services

## URL Examples

- All services: `/services`
- Plumbing services: `/services?category=Plumbing`
- Electrical services: `/services?category=Electrical`
- Cleaning services: `/services?category=Cleaning`

## Analytics Tracking

The system tracks:
- Category clicks from home page
- Service views with category context
- Search queries and results

## Responsive Design

- **Mobile**: Category cards stack vertically
- **Tablet**: 2 columns of category cards
- **Desktop**: 4 columns of category cards
- **All Sizes**: Quick filter buttons wrap appropriately

## Future Enhancements

1. **Category Statistics**: Show actual service counts per category
2. **Related Categories**: Suggest related categories
3. **Category Images**: Add category-specific background images
4. **Advanced Filtering**: Combine category with price, rating filters
5. **Category SEO**: Category-specific meta tags and descriptions

## Testing

To test the feature:

1. Go to home page
2. Click any category card
3. Verify redirection to services page with category filter
4. Check that services are filtered correctly
5. Test clearing the filter
6. Test direct URL access with category parameter
7. Verify breadcrumb navigation works
8. Test on different screen sizes

## Browser Support

- Modern browsers with ES6+ support
- React Router v7+ compatibility
- URL parameter support required