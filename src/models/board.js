exports.fresh = {
	title: 'New Project',
	columns: {
	  byId: {
	    0: {
	      id: 0,
	      title: 'todo',
	      cardIds: []
	    },
	    1: {
	      id: 1,
	      title: 'doing',
	      cardIds: []
	    },
	    2: {
	      id: 2,
	      title: 'done',
	      cardIds: []
	    }
	  },
	  allIds: [0,1,2]
	},
	cards: {
	  byId: {},
	  allIds: []
	}
}

exports.demo = {
	title: 'Example Board',
	columns: {
	  byId: {
	    0: {
	      id: 0,
	      title: 'todo',
	      cardIds: [0]
	    },
	    1: {
	      id: 1,
	      title: 'doing',
	      cardIds: [2,3]
	    },
	    2: {
	      id: 2,
	      title: 'done',
	      cardIds: [1]
	    }
	  },
	  allIds: [0,1,2]
	},
	cards: {
	  byId: {
	  	0: {
        id: 0,
        description: 'A little help to get you started...',
        checklists: {
          byId: {
            0: {
              id: 0,
              title: 'Editing fields',
              items: {
                byId: {
                  0: {
                    id: 0,
                    text: 'Text fields can be double-clicked to edit them.',
                    isChecked: false
                  },
                  1: {
                    id: 1,
                    text: 'Double-click your board title to give your board a name!',
                    isChecked: false
                  },
                  2: {
                    id: 2,
                    text: 'While editing, clicking elsewhere or pressing Esc cancels changes',
                    isChecked: false
                  },
                  3: {
                    id: 3,
                    text: 'And pressing Enter saves them',
                    isChecked: false
                  },
                  4: {
                    id: 4,
                    text: 'Board title, card description, checklist description and checklist item all behave this way',
                    isChecked: false
                  }
                },
                allIds: [0,1,2,3,4]
              }
            },
            1: {
            	id: 1,
            	title: 'Multiple Checklists',
            	items: {
            		byId: {
            			0: {
            				id: 0,
            				text: 'Cards can have more than one checklist',
            				isChecked: true
            			}
            		},
            		allIds: [0]
            	}
            }
          },
          allIds: [0,1]
        }
      },
      1: {
      	id: 1,
      	description: 'Handling your cards',
      	checklists: {
      		byId: {
      			0: {
            	id: 0,
            	title: 'Handling your cards is easy too!',
            	items: {
            		byId: {
            			0: {
                    id: 0,
                    text: 'Add a new card to a column using the + button',
                    isChecked: false
                  },
                  1: {
                    id: 1,
                    text: 'Or easily remove one using the red x at it\'s upper-right corner',
                    isChecked: false
                  },
                  2: {
                    id: 2,
                    text: 'Moving your cards to another column is as easy as clicking-and-dragging from the card\'s title. Give it a shot!',
                    isChecked: false
                  }
            		},
            		allIds: [0,1,2]
            	}
            }
      		},
      		allIds: [0]
      	}
      },
      2: {
      	id: 2,
      	description: 'Columns can have more than one card!',
      	checklists: {
      		byId: {},
      		allIds: []
      	}
      },
      3: {
      	id: 3,
      	description: 'Here\'s a second card in the same column',
      	checklists: {
      		byId: {},
      		allIds: []
      	}
      }
	  },
	  allIds: [0,1,2,3]
	}
}