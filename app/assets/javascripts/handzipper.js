var specs = {
  hand: "left",
  design: "EbeArm/Ebe_forearm",
  size: 100,
  fname: "Forge",
  lname: "Limb",
  l1: 23,
  c4: 23,
  design: {
    name: "",
    directory: ""
  }
};

$( "#limbforge" ).ready(function() {
  $("#limbforge-submit").click(function(){
    specs.hand = $('#handedness-selector').val().charAt(0).toUpperCase();
    specs.fname = $("#fname").val() == "" ? specs.fname : $("#fname").val();
    specs.lname = $("#lname").val() == "" ? specs.lname : $("#lname").val();
    specs.design = $('#design-selector').val();
    specs.l1 = translateValueL1(Math.round($("#L1").val() * 10));
    specs.c4 = translateValueC4(Math.round($("#C4").val() * 10));
    if (typeof specs.l1 != "number" ||specs.l1 > 300 || specs.l1 < 220) throw alert("Expected L1 size to be a number between 22cm - 30cm");
    if (typeof specs.c4 != "number" ||specs.c4 > 300 || specs.c4 < 200) throw alert("Expected C4 size to be a number between 20cm - 30cm");
    create_zip();
  });
});

function translateValueL1(input){
  // removing decimal from number
  var base_num = parseFloat(input.toFixed(1).toString().replace(".", ""));
  // round up to nearest 5
  var result = ((Math.ceil(base_num/5)*5)/10);
  return result
}

function translateValueC4(input){
  // removing decimal from number
  var base_num = parseFloat(input.toFixed(1).toString().replace(".", ""));
  // round down to nearest 5
  var result = ((Math.floor(base_num/5)*5)/10);
  return result
}

function zipFileName(specs){
  var today = new Date();
  var formatted_date =  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var zip_name = specs.lname.replace(/ /g,'') + "_" + specs.fname.replace(/ /g,'') + "_forearm_" + specs.hand.charAt(0).toUpperCase() + "_" + formatted_date + ".zip";
  return zip_name;
}

function create_zip() {
  var zip = new JSZip();
  var zipFilename = zipFileName(specs);
  var url1 = 'https://s3.amazonaws.com/limbforge/' + specs.design + "_" + specs.hand + "/forearm_" + specs.hand + "_C4-" + specs.c4 + "_L1-" + specs.l1+ '.stl';
  var urls = [
    url1
  ];

  var count = 0;
  // We're asynchronously asking for all of the files
  // We increment the count once each file is completely downloaded
  // Once the last file is downloaded (aka count == urls.length) then zip it and download it
  urls.forEach(function (url) {
    // Grab the filename from the url
    // For example if the url is http://google.com/awesome/foo.stl
    // We set filename = foo.stl
    var indexOfLastSlash = url.lastIndexOf('/');
    var filename = url.substring(indexOfLastSlash + 1);

    // Load a file from an external url and add it in a zip file
    // Beware! This will fail if the file is not binary
    // aka if it is a text file or an ascii stl model
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if(err) {
        // Probably should do something better here...
        // For example if the file server is down, provide some kind of info to the user
        throw err;
      }

      // Add the file to the zip
      zip.file(filename, data, { binary: true });
      count++;

      // We're all done! Zip it and ship it
      if (count == urls.length) {
        zip.generateAsync({ type: "blob" })
        .then(function(zipFile) {
          saveAs(zipFile, zipFilename);
        });
      }
    });
  });
}
