import {CHESS} from './actiontypes'

export const whitemove = move => ({
    type: CHESS.WHITEMOVE,
    move
})
 

export const blackmove = () => ({
    type: CHESS.BLACKMOVE
})
 
