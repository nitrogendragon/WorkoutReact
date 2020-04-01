import React,{useState} from 'react'

export default function TextFileReader(props) {
    
    const [json, setJson] = useState("");
    let fileInputRef = React.createRef();

    function insertIntoStrings(result){
        let i = 0
        let start = 0
        let temp = []
        let tempExercises =  []
        let tempActivePeriods = []
        let tempRestPeriods = []
        let tempString = ""
        console.log(result.length)
        for(i; i < result.length; i++){
            if(result[i] !== ","){
                console.log("not a comma")
                tempString = tempString + result[i]
            }
            else{
                temp[start]=tempString
                tempString = ""
                start++
            }
        }
        // order should be first exercise, second rest period, third active period
        // so 0 an
        for(i = 0; i < temp.length; i++){
            i === 0 || i % 3 === 0 ? tempExercises = [...tempExercises, temp[i]]
            :
            i === 1 || i % 3 === 1 ? tempRestPeriods = [...tempRestPeriods, temp[i]]
            :
            i === 2 || i % 3 === 2 ? tempActivePeriods = [...tempActivePeriods, temp[i]]
            :
            console.log("nothing to do here orheaven forbid an error occured" )
        }
        props.setRestPeriods(tempRestPeriods)
        props.setActivePeriods(tempActivePeriods)
        props.setExerciseList(tempExercises)
        console.log("tempExercises" + tempExercises)
        console.log("tempRestPeriods" + tempRestPeriods)
        console.log("tempActivePeriods" + tempActivePeriods)
    }
  
    return (
      <div className="App">
        <p>{json}</p>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={async e => {
            const reader = new FileReader();
            reader.onload = function() {
                insertIntoStrings(reader.result)
            };
            reader.readAsText(e.target.files[0]);
          }}
          accept=".txt,application/txt"
        />
        <button
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          Upload Workout
        </button>
      </div>
    );
  }


