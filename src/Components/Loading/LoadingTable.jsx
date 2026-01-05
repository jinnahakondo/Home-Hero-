import React from 'react';

const LoadingTableRow = ({ columns = 4 }) => {
    return (
        <tr className="animate-pulse border-t border-base-200">
            {Array(columns).fill(0).map((_, index) => (
                <td key={index} className="px-4 py-4">
                    <div className="h-4 bg-base-300 rounded w-full"></div>
                </td>
            ))}
        </tr>
    );
};

const LoadingTable = ({
    columns = 4,
    rows = 5,
    headers = [],
    className = ''
}) => {
    return (
        <div className={`bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden ${className}`}>
            <table className="w-full">
                {headers.length > 0 && (
                    <thead className="bg-base-200">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="text-left p-4 font-semibold text-base-content">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {Array(rows).fill(0).map((_, index) => (
                        <LoadingTableRow key={index} columns={columns} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoadingTable;