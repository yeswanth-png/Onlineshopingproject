import React ,{useState}from 'react'
import Banner from '../container/Banner'
import Footer from '../container/Footer'
import Collection from '../container/Collection'
import Header from '../container/Header'
import { Gents,Ladies } from '../data'
import Women from '../container/Women'
import Signin from '../container/Signin'
import Header1 from '../container/Header1'
const MainPage1 = () => {
    const [gents, setGents] = useState(Gents);
    const [ladies, setLadies] = useState(Ladies);
  return (
    <div>
        <Header1/>
  
      <Banner />
          <Collection gents={gents}/>
          <Women ladies={ladies} />
          <Footer />
    </div>
  )
}

export default MainPage1
