import React from 'react';
import ReactHtmlParser from 'react-html-parser';


class TransplantList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    this.state = {
      guidelineLoaded:          false,
      guideline:                [],
      chapters:                 [],
      selectedChapters:         this.props.selectedChapters
    };

    this.handleCheckbox          = this.handleCheckbox.bind(this)
    this.getChapters             = this.getChapters.bind(this)
    this.checkboxClassname       = this.checkboxClassname.bind(this)
    this.checkChecked            = this.checkChecked.bind(this)
    this.selectAll               = this.selectAll.bind(this);
    this.deselectAll             = this.deselectAll.bind(this);
    this.sort                    = this.sort.bind(this);
    this.selectAllSorted         = this.selectAllSorted.bind(this);
    this.deselectAllSorted       = this.deselectAllSorted.bind(this);
  }

  componentDidMount(){

    fetch('/extern/api/allguidelines/' + this.props.selectedGuidelineID)
    .then(blob => {return blob.json()})
    //.then(blob => console.log(blob))
    .then(
        (blob) => {

          this.getChapters(blob.data)
          this.setState({
            guidelineLoaded: true,
            guideline: blob.data
          });

        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
    )

  }

  selectAll() {
    var selectedChapters = []
    this.state.chapters.forEach( chapter => {
      selectedChapters.push(chapter)
    })
    this.setState({ selectedChapters: selectedChapters })
    // this.props.handleCheckboxRecommendations(checkedRecommendations)
  }

  checkboxClassname(item){
    if (this.state.selectedChapters.some(chapter => chapter.uid === item.uid))
      return "radioholder activeradioholder"
    else
      return "radioholder"
  }

  selectAllSorted(){
    var checkedRecommendations = this.state.checkedRecommendations
    var checkedRecommendationsNew = []
    //remove the ones that are selected already
    checkedRecommendations.forEach( recommendation => {
      if(recommendation.number[0] !== this.state.sortedRecommendations[0].number[0]){
        checkedRecommendationsNew.push(recommendation)
      }
    })

    //add all recommendations from selected chapter
     var recommendations = this.state.recommendations
    recommendations.forEach( recommendation => {
      if(recommendation.number[0] === this.state.sortedRecommendations[0].number[0]){
        checkedRecommendationsNew.push(recommendation)
      }
    })

    this.setState({ checkedRecommendations: checkedRecommendationsNew })
    this.props.handleSelectedChapters(checkedRecommendationsNew)
  }

  deselectAllSorted(){
    var checkedRecommendations = this.state.checkedRecommendations
    var checkedRecommendationsNew = []
    //remove the ones that are selected already
    checkedRecommendations.forEach( recommendation => {
      if(recommendation.number[0] !== this.state.sortedRecommendations[0].number[0]){
        checkedRecommendationsNew.push(recommendation)
      }
    })

    this.setState({ checkedRecommendations: checkedRecommendationsNew })
    this.props.handleCheckboxRecommendations(checkedRecommendationsNew)
  }

  deselectAll(){
    this.setState({ selectedChapters: [] }) 
    this.props.handleSelectedChapters([])
  }

  handleCheckbox(item) {
    console.log(item)
    let bool = this.state.selectedChapters.some(chapter => chapter.uid === item.uid)
    if(bool) {
            let selectedChapters = this.state.selectedChapters
            const index = selectedChapters.findIndex(x => x.uid === item.uid);
            if (index !== -1 && index !== undefined) 
              selectedChapters.splice(index, 1);
            this.setState({ selectedChapters: selectedChapters })
            this.props.handleSelectedChapters(selectedChapters)
    } else {
      let selectedChapters = this.state.selectedChapters
      selectedChapters.push(item)
      this.setState({ selectedChapters: selectedChapters })
      this.props.handleSelectedChapters(selectedChapters)
    }
  }

  checkChecked(item){
    const index = this.state.checkedRecommendations.findIndex(x => x.uid === item.uid);
    if (index !== -1 && index !== undefined) {
      return true
    } else {
      return false
    }
  }

  sort(){
    let chapter = event.target.value

    if(chapter === 'all guidelines'){
      this.setState({sort: false})
      return
    }

    let recommendations = this.state.recommendations
    let sortedRecommendations = []
    recommendations.forEach(recommendation => {
      if(recommendation.number[0] === chapter)
        sortedRecommendations.push(recommendation)
    })

    this.setState({sort: true, sortedRecommendations: sortedRecommendations})
  }

render() {
      return (

      <article className="">

                      <div className="row">
                          <div className="col-12" style={{paddingBottom: '10px'}}>
                                <p style={{display: 'inline'}}>Filter:</p>
                                <button className="button_dkg" style={{marginLeft: '6px'}} onClick={(e) => this.selectAll(e)}>Alle selektieren</button>
                                <button className="button_dkg" style={{marginLeft: '6px'}} onClick={(e) => this.deselectAll(e)}>deselektieren</button>
                          </div>
                          <div className="col-12">

                                    <div id="checks" className="myBox" style={{height: '55vh', overflow: 'scroll'}}>
                                    {this.state.chapters.map(item => (
                                       <span>

                                              <div className={this.checkboxClassname(item)} onClick={e => this.handleCheckbox(item)}>
                                                <span className="tick"></span>
                                                <input type="radio" uid={item.uid} title={item.title} value={item.title}
                                                checked={selectedChapters.some(chapter => chapter.uid === item.uid)} style={{display: 'none'}}/> 
                                                {' ' + item.number + '. ' +item.title}
                                              </div>


                                    </span>
                                    ))}
                                      <br/>
                                    </div>
                           </div>
                      </div>
        </article>
      )}

  }
}

export default TransplantList;