
// export const mockUsers = [
//     { id: 1, name: 'Kazuki', color: '#f44336' },
//     { id: 2, name: 'Nikita', color: '#4caf50' },
//     { id: 3, name: 'Jinya', color: '#2196f3' },
//     { id: 4, name: 'Lucas', color: '#ff9800' },
//     { id: 5, name: 'Justin', color: '#9c27b0' },
//     { id: 6, name: 'James', color: '#3f51b5' }
// ];

import { DateTime } from "luxon";

export const mockHistory = [
    // August 24, 2025 (Saturday) - Weekend, lighter activity
    { id: 1, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-24T09:00:00+09:00') },
    { id: 2, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-24T09:30:00+09:00') },
    { id: 3, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-24T10:00:00+09:00') },
    { id: 4, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-24T10:30:00+09:00') },
    { id: 5, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-24T11:00:00+09:00') },
    { id: 6, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-24T11:30:00+09:00') },
    // Lunch break 12:00-13:00
    { id: 7, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-24T13:00:00+09:00') },
    { id: 8, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-24T13:30:00+09:00') },
    { id: 9, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-24T14:00:00+09:00') },

    // August 25, 2025 (Sunday) - Weekend, lighter activity
    { id: 10, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-25T09:00:00+09:00') },
    { id: 11, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-25T09:30:00+09:00') },
    { id: 12, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-25T10:00:00+09:00') },
    { id: 13, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-25T10:30:00+09:00') },

    // August 26, 2025 (Monday) - Full work day
    // Kazuki (User 1) - CKID morning, Intranet afternoon
    { id: 14, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T09:00:00+09:00') },
    { id: 15, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T09:30:00+09:00') },
    { id: 16, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T10:00:00+09:00') },
    { id: 17, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T10:30:00+09:00') },
    { id: 18, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T11:00:00+09:00') },
    { id: 19, userId: 1, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T11:30:00+09:00') },
    // Lunch break 12:00-13:00
    { id: 20, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T13:00:00+09:00') },
    { id: 21, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T13:30:00+09:00') },
    { id: 22, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T14:00:00+09:00') },
    { id: 23, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T14:30:00+09:00') },
    { id: 24, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T15:00:00+09:00') },
    { id: 25, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T15:30:00+09:00') },
    { id: 26, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T16:00:00+09:00') },
    { id: 27, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T16:30:00+09:00') },
    { id: 28, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T17:00:00+09:00') },
    { id: 29, userId: 1, projectId: 4, timestamp: DateTime.fromISO('2025-08-26T17:30:00+09:00') },

    // Nikita (User 2) - Biz all day
    { id: 30, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T09:00:00+09:00') },
    { id: 31, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T09:30:00+09:00') },
    { id: 32, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T10:00:00+09:00') },
    { id: 33, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T10:30:00+09:00') },
    { id: 34, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T11:00:00+09:00') },
    { id: 35, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T11:30:00+09:00') },
    // Lunch break 12:00-13:00
    { id: 36, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T13:00:00+09:00') },
    { id: 37, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T13:30:00+09:00') },
    { id: 38, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T14:00:00+09:00') },
    { id: 39, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T14:30:00+09:00') },
    { id: 40, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T15:00:00+09:00') },
    { id: 41, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T15:30:00+09:00') },
    { id: 42, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T16:00:00+09:00') },
    { id: 43, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T16:30:00+09:00') },
    { id: 44, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T17:00:00+09:00') },
    { id: 45, userId: 2, projectId: 2, timestamp: DateTime.fromISO('2025-08-26T17:30:00+09:00') },

    // Jinya (User 3) - Workflows morning, CKID afternoon
    { id: 46, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-26T09:00:00+09:00') },
    { id: 47, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-26T09:30:00+09:00') },
    { id: 48, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-26T10:00:00+09:00') },
    { id: 49, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-26T10:30:00+09:00') },
    { id: 50, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-26T11:00:00+09:00') },
    { id: 51, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-26T11:30:00+09:00') },
    // // Lunch break 12:00-13:00
    { id: 52, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T13:00:00+09:00') },
    { id: 53, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T13:30:00+09:00') },
    { id: 54, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T14:00:00+09:00') },
    { id: 55, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T14:30:00+09:00') },
    { id: 56, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T15:00:00+09:00') },
    { id: 57, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T15:30:00+09:00') },
    { id: 58, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T16:00:00+09:00') },
    { id: 59, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T16:30:00+09:00') },
    { id: 60, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T17:00:00+09:00') },
    { id: 61, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-26T17:30:00+09:00') },
    
    // August 27, 2025 (Tuesday) - Full work day
    // Jinya (User 3) - Workflows morning, CKID afternoon
    { id: 46, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T09:00:00+09:00') },
    { id: 47, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T09:30:00+09:00') },
    { id: 48, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T10:00:00+09:00') },
    { id: 49, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T10:30:00+09:00') },
    { id: 50, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T11:00:00+09:00') },
    { id: 51, userId: 3, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T11:30:00+09:00') },
    // // Lunch break 12:00-13:00
    { id: 52, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T13:00:00+09:00') },
    { id: 53, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T13:30:00+09:00') },
    { id: 54, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T14:00:00+09:00') },
    { id: 55, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T14:30:00+09:00') },
    { id: 56, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T15:00:00+09:00') },
    { id: 57, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T15:30:00+09:00') },
    { id: 58, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T16:00:00+09:00') },
    { id: 59, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T16:30:00+09:00') },
    { id: 60, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T17:00:00+09:00') },
    { id: 61, userId: 3, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T17:30:00+09:00') },

    // Lucas (User 4) - SOC morning, Biz afternoon
    { id: 62, userId: 4, projectId: 5, timestamp: DateTime.fromISO('2025-08-27T09:00:00+09:00') },
    { id: 63, userId: 4, projectId: 5, timestamp: DateTime.fromISO('2025-08-27T09:30:00+09:00') },
    { id: 64, userId: 4, projectId: 5, timestamp: DateTime.fromISO('2025-08-27T10:00:00+09:00') },
    { id: 65, userId: 4, projectId: 5, timestamp: DateTime.fromISO('2025-08-27T10:30:00+09:00') },
    { id: 66, userId: 4, projectId: 5, timestamp: DateTime.fromISO('2025-08-27T11:00:00+09:00') },
    { id: 67, userId: 4, projectId: 5, timestamp: DateTime.fromISO('2025-08-27T11:30:00+09:00') },
    // Lunch break 12:00-13:00
    { id: 68, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T13:00:00+09:00') },
    { id: 69, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T13:30:00+09:00') },
    { id: 70, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T14:00:00+09:00') },
    { id: 71, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T14:30:00+09:00') },
    { id: 72, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T15:00:00+09:00') },
    { id: 73, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T15:30:00+09:00') },
    { id: 74, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T16:00:00+09:00') },
    { id: 75, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T16:30:00+09:00') },
    { id: 76, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T17:00:00+09:00') },
    { id: 77, userId: 4, projectId: 2, timestamp: DateTime.fromISO('2025-08-27T17:30:00+09:00') },
    
    // Justin (User 5) - CKID morning, Workflows afternoon
    { id: 78, userId: 5, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T09:00:00+09:00') },
    { id: 79, userId: 5, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T09:30:00+09:00') },
    { id: 80, userId: 5, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T10:00:00+09:00') },
    { id: 81, userId: 5, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T10:30:00+09:00') },
    { id: 82, userId: 5, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T11:00:00+09:00') },
    { id: 83, userId: 5, projectId: 1, timestamp: DateTime.fromISO('2025-08-27T11:30:00+09:00') },
    // Lunch break 12:00-13:00
    { id: 84, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T13:00:00+09:00') },
    { id: 85, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T13:30:00+09:00') },
    { id: 86, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T14:00:00+09:00') },
    { id: 87, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T14:30:00+09:00') },
    { id: 88, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T15:00:00+09:00') },
    { id: 89, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T15:30:00+09:00') },
    { id: 90, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T16:00:00+09:00') },
    { id: 91, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T16:30:00+09:00') },
    { id: 92, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T17:00:00+09:00') },
    { id: 93, userId: 5, projectId: 3, timestamp: DateTime.fromISO('2025-08-27T17:30:00+09:00') },
    
    // James (User 6) - Updates all day
    { id: 94, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T09:00:00+09:00') },
    { id: 95, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T09:30:00+09:00') },
    { id: 96, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T10:00:00+09:00') },
    { id: 97, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T10:30:00+09:00') },
    { id: 98, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T11:00:00+09:00') },
    { id: 99, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T11:30:00+09:00') },
    // Lunch break 12:00-13:00
    { id: 100, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T13:00:00+09:00') },
    { id: 101, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T13:30:00+09:00') },
    { id: 102, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T14:00:00+09:00') },
    { id: 103, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T14:30:00+09:00') },
    { id: 104, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T15:00:00+09:00') },
    { id: 105, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T15:30:00+09:00') },
    { id: 106, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T16:00:00+09:00') },
    { id: 107, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T16:30:00+09:00') },
    { id: 108, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T17:00:00+09:00') },
    { id: 109, userId: 6, projectId: 6, timestamp: DateTime.fromISO('2025-08-27T17:30:00+09:00') },
    
    // August 28, 2025 (Wednesday) - Current day, work in progress
    // Kazuki (User 1) - SOC morning
    { id: 110, userId: 1, projectId: 5, timestamp: DateTime.fromISO('2025-08-28T09:00:00+09:00') },
    { id: 111, userId: 1, projectId: 5, timestamp: DateTime.fromISO('2025-08-28T09:30:00+09:00') },
    { id: 112, userId: 1, projectId: 5, timestamp: DateTime.fromISO('2025-08-28T10:00:00+09:00') },
    { id: 113, userId: 1, projectId: 5, timestamp: DateTime.fromISO('2025-08-28T10:30:00+09:00') },
    { id: 114, userId: 1, projectId: 5, timestamp: DateTime.fromISO('2025-08-28T11:00:00+09:00') },
    { id: 115, userId: 1, projectId: 5, timestamp: DateTime.fromISO('2025-08-28T11:30:00+09:00') },
    
    // Nikita (User 2) - Workflows morning
    { id: 116, userId: 2, projectId: 3, timestamp: DateTime.fromISO('2025-08-28T09:00:00+09:00') },
    { id: 117, userId: 2, projectId: 3, timestamp: DateTime.fromISO('2025-08-28T09:30:00+09:00') },
    { id: 118, userId: 2, projectId: 3, timestamp: DateTime.fromISO('2025-08-28T10:00:00+09:00') },
    { id: 119, userId: 2, projectId: 3, timestamp: DateTime.fromISO('2025-08-28T10:30:00+09:00') },
    { id: 120, userId: 2, projectId: 3, timestamp: DateTime.fromISO('2025-08-28T11:00:00+09:00') },
    { id: 121, userId: 2, projectId: 3, timestamp: DateTime.fromISO('2025-08-28T11:30:00+09:00') },
    
    // Jinya (User 3) - Intranet morning
    { id: 122, userId: 3, projectId: 4, timestamp: DateTime.fromISO('2025-08-28T09:00:00+09:00') },
    { id: 123, userId: 3, projectId: 4, timestamp: DateTime.fromISO('2025-08-28T09:30:00+09:00') },
    { id: 124, userId: 3, projectId: 4, timestamp: DateTime.fromISO('2025-08-28T10:00:00+09:00') },
    { id: 125, userId: 3, projectId: 4, timestamp: DateTime.fromISO('2025-08-28T10:30:00+09:00') },
    { id: 126, userId: 3, projectId: 4, timestamp: DateTime.fromISO('2025-08-28T11:00:00+09:00') },
    { id: 127, userId: 3, projectId: 4, timestamp: DateTime.fromISO('2025-08-28T11:30:00+09:00') }
];