import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Header from '../components/Header';
import MainFeaturedPage from '../components/MainFeaturedPage';
import FeaturedPage from '../components/FeaturedPage';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import getReviews from '../utils/getReviews';


const sections = [
  { title: 'Shop', url: '/commerce' },
  { title: 'Veterinari', url: '#' },
  { title: 'Dog Sitter', url: '#' },
  { title: 'Giocattoli', url: '#' },
  { title: 'Igene', url: '#' },
  { title: 'Game', url: '#' },
  { title: 'Cibo', url: '#' },
  { title: 'Accessoristica', url: '#' },
];

const mainFeaturedPage = {
  title: 'Shopping Online',
  description:
    "Un qualche tipo di testo copiancollato da Amazon.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Visit the Shop',
  href: '/commerce'
};

const featuredPages = [
  {
    title: 'Servizi',
    description:
      'Animal House ti mette in contatto con professionisti incredibili, tipo veterinari che ti resuscitano il pesce rosso',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    linkText: 'Prenota Subito!',
    href: '/commerce'
  },
  {
    title: 'Community',
    description:
      'BACHECAECCOLOQUA.png',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    linkText: 'Unisciti subito!',
    href: '/commerce'
  },
];


const sidebar = {
  title: 'About',
  description:
  'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    
  ],
};

const reviews = getReviews();

export default function Blog() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Animal House" sections={sections} />
        <main>
          <MainFeaturedPage {...mainFeaturedPage} />
          <Grid container spacing={4}>
            {featuredPages.map((page) => (
              <FeaturedPage key={page.title} {...page} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Recensioni" reviews={reviews} />
            <Sidebar
              {...sidebar}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"/>
    </>
  );
}