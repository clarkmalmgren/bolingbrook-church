
# Content Desitribution

The vast majority of the actual content is stored in Firestore and delivered dynamically
to the client and then rendered dynamically. The models returned map directly onto well
defined components. They follow a standard structure for some common fields but obviously
have customized data depending on the component type. This document focuses not so much
on the components themselves, but more on the standard concepts, how to access the info,
and designs for fetching.

## Basic field structure

The following fields have 

  - `id`: The unique ID of this element. It is also the path key for accessing. This is
          a random 8-character string using base64 characters. 
  - `type`: Identifies what kind of component this is. The rest of the fields are
            contextually based on this field.

## 
