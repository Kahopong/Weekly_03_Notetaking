var notesTemplate = Handlebars.compile(
    `{{#each notes}}
        <div class="note">
            <span class="input"><textarea class='noteArea' data-horse="pony" data-id="{{ @index }}"> {{ this }}</textarea></span>
            <button class="remove btn btn-xs" data-id="{{ @index }}"><i class="fas fa-skull-crossbones"></i></button>
            </div>
            {{/each}}
    `
);

// This function is responsible of re-rendering the page every time we update our notes. It recieves the array of notes and then forces each note (each element within the array) into the notes template, which iterates through the array rendering all the notes to the DOM in the same format.
const reloadNotes = (notes) => {
    console.log("RELOADING");
    console.log(notes);
    $("#notes").html(notesTemplate({ notes: notes }));
};

// This function is used and defined to make a message appear on the dom when saving our note.
const beginSaving = (target) => {
    $(target).prop("disabled", true);
    $(".saving").show();
};

// This function is used and defined to make a message disappear on the dom after saving our note.
const endSaving = (target) => {
    $(target).prop("disabled", true);
    $(".saving").hide();
};

// Document on ready function, when the document has fully loaded we can do everything within this block of code.
$(() => {
    axios
        .get("/api/notes/")
        .then((res) => {
            console.log(`Getting notes: ${res.data}`);
            reloadNotes(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

    // Add an event listener on the add button, such then when we press the button we grab the value from our text box and then send that value to our server in our post request, then we receive the new data from our server and reload all of our notes.
    $("#add").submit((e) => {
        e.preventDefault();
        console.log("add pressed");

        var val = $("textarea[name=note]").val();
        console.log(val);
        if (val === "") {
            return;
        }
        $("textarea[name=note]").val("");
        axios
            .post("/api/notes/", {
                note: val
            })
            .then((res) => {
                console.log(res.data);
                reloadNotes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // Add an event listener to our div (it has an id of notes) which encapsulates our text-areas, we specify we are targeting the text areas. When we blur (lose focus on the text area), we begin saving our new note (make the message appear on the DOM)
    $("#notes").on("blur", "textarea", (event) => {
        beginSaving(event.currentTarget);
        axios
            .put("/api/notes/" + $(event.currentTarget).data("id"), {
                note: $(event.currentTarget).val()
            })
            .then((res) => {
                endSaving(event.currentTarget);
                reloadNotes(res.data);
            })
            .catch((e) => {
                endSaving(event.currentTarget);
                alert(e);
            });
    });

    // Add an event listener onto the buttons that we generate along with each note, we target the class remove and listen for a click event.
    $("#notes").on("click", ".remove", (event) => {
        beginSaving(event.currentTarget);
        axios
            .delete("/api/notes/" + $(event.currentTarget).data("id"))
            .then((res) => {
                endSaving(event.currentTarget);
                reloadNotes(res.data);
            })
            .catch((e) => {
                endSaving(e.currentTarget);
                alert(e);
            });
    });
});