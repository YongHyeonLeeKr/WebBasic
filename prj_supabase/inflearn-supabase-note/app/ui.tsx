'use client';

import EmptyNote from '@/components/empty-note';
import Header from '@/components/header';
import NewNote from '@/components/new-note';
import NoteViewer from '@/components/note-viewer';
import Sidebar from '@/components/sidebar';
import { useState } from 'react';

const notes = [
    {
        id: 1,
        title: 'note 1 ',
        content: 'note content1'
    },

    {
        id: 2,
        title: 'note 2 ',
        content: 'note content 2'
    },

    {
        id: 3,
        title: 'note 3 ',
        content: 'note content3'
    }
];

export default function UI () {

    const [activeNoteId, setActiveNoteId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    return (
    <main className='w-full h-screen flex flex-col'>
      <Header />
      <div className='grow relative'>
        <Sidebar activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} setIsCreating={setIsCreating} notes={notes} />
        {
          isCreating ? <NewNote setIsCreating={setIsCreating} /> 
          : activeNoteId ? <NoteViewer note = {notes.find(note => note.id === activeNoteId) }/>
          : <EmptyNote />
        }
      </div>
    </main>
  );
}