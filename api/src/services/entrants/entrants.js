import { db } from 'src/lib/db'

export const entrants = () => {
  return db.entrant.findMany()
}

export const entrant = ({ id }) => {
  return db.entrant.findUnique({
    where: { id },
  })
}

export const createEntrant = ({ input }) => {
  return db.entrant.create({
    data: input,
  })
}

export const updateEntrant = ({ id, input }) => {
  return db.entrant.update({
    data: input,
    where: { id },
  })
}

export const deleteEntrant = ({ id }) => {
  return db.entrant.delete({
    where: { id },
  })
}
