import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination"
import axios from "axios";

function App(){
  //default state
  const [pokemon, setPokemon] = useState([])
  //need state to track current page we are on
  const [currentPageUrl, setCurrentPageUrl] = useState("http://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState("")
  const [prevPageUrl, setPrevPageUrl] = useState("")
  const [loading, setLoading] = useState(true)


  //need useEffect to render the app to run only once
  useEffect(() => {
    //loading screen so it doesn't show blank screen
    setLoading(true)
    //cancel token to cancel a request
    let cancel
    axios.get(currentPageUrl, {
      //will cancel old request everytime there is a new one
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      //set data for next and previous pages
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      //will be list of pokemon names, setPokemon to the list of names
      setPokemon(res.data.results.map(p => p.name))
    })

    //call cancel function
    return () => cancel()

    //every time currentPageUrl changes it will re-render
  },[currentPageUrl])

  //create function to change page
  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }
  function goToPreviousPage(){
    setCurrentPageUrl(prevPageUrl)
  }


  if (loading) return "Loading..."
  

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        goToNextPage={nextPageUrl ? goToNextPage : null} 
        goToPreviousPage={prevPageUrl ? goToPreviousPage : null} 
      />
    </>
//above ternary sets the next and prev button not appear when there is no available page in that direction

  )
}

export default App;