export type MutationFunctions = {
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
    onMutate?: () => void,
    onSettled?: (error: unknown) => void,
}
