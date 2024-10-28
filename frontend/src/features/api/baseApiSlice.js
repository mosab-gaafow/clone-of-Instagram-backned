import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// base api geen ayaa lagu qoraa mesha aadeeno
// RTK

const baseQuery = fetchBaseQuery({
    baseUrl: '/api/v1'
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({}) // waa faaruq sbbto ah wxa rabnaa ina hadhaow 
    // qof wlba kiisa uu so qoro sida file-ka postApiSlice
})





