export const formatDifficulty = (difficulty?: number):string => {
    switch (difficulty) {
        case 1:
            return 'Muito Fácil'
        case 2:
            return 'Fácil'
        case 3:
            return 'Normal'
        case 4:
            return 'Difícil'
        case 5:
            return 'Muito Difícil'
            
        default:
            return 'Muito Fácil'
    }
}