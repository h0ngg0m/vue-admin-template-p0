type recentTrans = {
  title: string
  subtitle: string
  textcolor: string
  boldtext: boolean
  line: boolean
  link: string
  url: string
}

type productPerformanceType = {
  id: number
  name: string
  post: string
  pname: string
  status: string
  statuscolor: string
  budget: string
}

type productsCards = {
  title: string
  link: string
  photo: string
  salesPrice: number
  price: number
  rating: number
}

export type { recentTrans, productPerformanceType, productsCards }
