import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

import api from "../../services/api";

import type {
    ApiResponse,
    Developer,
    DeveloperDetails,
} from "./developerTypes";

interface DeveloperState {
    developers: Developer[];
    selectedDeveloper: DeveloperDetails | null;
    stats: GraphStats | null;
    loading: boolean;
    error: string | null;
}

const initialState: DeveloperState = {
    developers: [],
    selectedDeveloper: null,
    stats: null,
    loading: false,
    error: null,
};

interface GraphStats {
    developers: number;
    skills: number;
    projects: number;
    technologies: number;
}

export const fetchDevelopers = createAsyncThunk<
    Developer[],
    void,
    { rejectValue: string }
>("developers/fetchDevelopers", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get<ApiResponse<Developer[]>>(
            "/developers"
        );

        return response.data.data;
    } catch {
        return rejectWithValue("Unable to load developers");
    }
});

export const fetchDeveloperById = createAsyncThunk<
    DeveloperDetails,
    string,
    { rejectValue: string }
>("developers/fetchDeveloperById", async (developerId, {
    rejectWithValue,
}) => {
    try {
        const response = await api.get<ApiResponse<DeveloperDetails>>(
            `/developers/${developerId}`
        );

        return response.data.data;
    } catch {
        return rejectWithValue("Unable to load developer details");
    }
});

export const searchDevelopers = createAsyncThunk<
    Developer[],
    { skill?: string; technology?: string },
    { rejectValue: string }
>(
    "developers/searchDevelopers",
    async ({ skill, technology }, { rejectWithValue }) => {
        try {
            const response = await api.get<ApiResponse<Developer[]>>(
                "/developers/search",
                {
                    params: {
                        skill,
                        technology,
                    },
                }
            );

            return response.data.data;
        } catch {
            return rejectWithValue("Unable to search developers");
        }
    }
);

const developerSlice = createSlice({
    name: "developers",
    initialState,
    reducers: {
        clearSelectedDeveloper: (state) => {
            state.selectedDeveloper = null;
        },

        clearError: (state) => {
            state.error = null;
        },

        setDevelopers: (state, action: PayloadAction<Developer[]>) => {
            state.developers = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder

            // Fetch all developers
            .addCase(fetchDevelopers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchDevelopers.fulfilled, (state, action) => {
                state.loading = false;
                state.developers = action.payload;
            })

            .addCase(fetchDevelopers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Unable to load developers";
            })

            // Fetch developer details
            .addCase(fetchDeveloperById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedDeveloper = null;
            })

            .addCase(fetchDeveloperById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedDeveloper = action.payload;
            })

            .addCase(fetchDeveloperById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Unable to load developer";
            })

            // Search developers
            .addCase(searchDevelopers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(searchDevelopers.fulfilled, (state, action) => {
                state.loading = false;
                state.developers = action.payload;
            })

            .addCase(searchDevelopers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Unable to search developers";
            })

            .addCase(fetchGraphStats.fulfilled, (state, action) => {
                state.stats = action.payload;
            });
    },
});

export const fetchGraphStats = createAsyncThunk<
    GraphStats,
    void,
    { rejectValue: string }
>("developers/fetchGraphStats", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get<ApiResponse<GraphStats>>(
            "/developers/stats"
        );

        return response.data.data;
    } catch {
        return rejectWithValue(
            "Unable to load graph statistics"
        );
    }
});

export const {
    clearSelectedDeveloper,
    clearError,
    setDevelopers,
} = developerSlice.actions;

export default developerSlice.reducer;