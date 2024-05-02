import requests
import os
from dotenv import load_dotenv

load_dotenv()


def create_issue(title, body, repo, token):
    """Create an issue on github.com using the given parameters."""
    url = f"https://api.github.com/repos/SpencerPresley/COSC425-FRONT/issues"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
    }
    data = {"title": title, "body": body}
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 201:
        print(f"Issue created successfully: {title}")
    else:
        print(f"Failed to create issue: {response.content}")


def main():
    token = os.getenv("GH_ACCESS_TOKEN")
    repo = "COSC425-FRONT/issues"
    todo_file = "TODO.md"
    processing_task = False
    title = ""
    body = "This issue was auto-generated from a markdown TODO list.\n\n"
    current_header = ""

    with open(todo_file, "r") as file:
        for line in file:
            if line.startswith("####"):  # Check for a header
                current_header = line.strip().split(" ", 1)[
                    1
                ]  # Capture the header text
            elif "[ ]" in line and not line.startswith("    "):  # Check for a new task
                if processing_task:
                    # Create the previous task before starting a new one
                    create_issue(current_header + " - " + title, body, repo, token)
                    body = "This issue was auto-generated from a markdown TODO list.\n\n"  # Reset body for the next task
                # Start a new task
                title = line.split("[ ] ")[1].strip()
                processing_task = True
            elif processing_task and line.startswith(
                "    "
            ):  # Check for additional details of the current task
                # Append additional details to the body
                additional_detail = line.strip()
                body += additional_detail + "\n"
            else:
                processing_task = False  # No longer processing a task

        if processing_task:
            # Create the last task if the file ends
            create_issue(current_header + " - " + title, body, repo, token)


if __name__ == "__main__":
    main()
