var SmartTables = {
  print: function() {
    var table = document.getElementById("SmartTable");
    var i=0;
    while(this.resultSet.hasNext()) {
      var row = table.insertRow(i++);
      var next = this.resultSet.next();
      for(var j=0; j<next.length; j++) {
        var cell = row.insertCell(j);		
        cell.innerHTML = next[j];
      }	
    }
  },
  resultSet: {
  	pageSize : 2,
    counter : 0,
    results : null,
    nextPage: function() { 
      var pages = [ [["P1R1I1","P1R1I2"],["P1R2I1","P1R2I2"]] , [["P2R2I1","P2R2I2"]] ];   

      var request = new XMLHttpRequest();
      request.open("GET", "https://eu25.salesforce.com/services/data/v42.0/query?q=SELECT%20Id%2C%20Name%20FROM%20Account", false);
      request.setRequestHeader("Authorization","Basic c2lkcml0ckB0b2xhc29mdHdhcmVzZXJ2aWNlcy5jb206aXRuZWdhbG90MjAxMg==");
      request.send(null);
      var txt = request.responseText;

      return pages[this.counter/this.pageSize];
    },
    hasNext: function() { 
      var mod = this.counter%this.pageSize;
      if(mod===0)
        this.results = this.nextPage();
      if(this.results===null) {
        return false;
      } else {
        if(mod<this.pageSize) {
          return true;
        } else {
          return this.hasNext();
        }
      }
    },
    next: function() { 
    	return this.results[this.counter++ % this.pageSize]; 
    },
  }
}